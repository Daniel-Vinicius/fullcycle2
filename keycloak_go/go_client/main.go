package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	oauth2 "golang.org/x/oauth2"

	oidc "github.com/coreos/go-oidc"
)

var (
	clientID = "myclient"
	clientSecret = "JBmmCU53qVwc1cjjZfU2ye5XbWLIi2sC"
)

func main() {
	ctx := context.Background()

	provider, err := oidc.NewProvider(ctx, "http://localhost:8080/realms/myrealm")
	if err != nil {
		log.Fatal(err)
	}

	config := oauth2.Config{
		ClientID: clientID,
		ClientSecret: clientSecret,
		Endpoint: provider.Endpoint(),
		RedirectURL: "http://localhost:8081/auth/callback",
		Scopes: []string{oidc.ScopeOpenID, "profile", "email", "roles"},
	}

	state := "123"

	http.HandleFunc("/", func(writter http.ResponseWriter, request *http.Request) {
		http.Redirect(writter, request, config.AuthCodeURL(state), http.StatusFound)
	})

	http.HandleFunc("/auth/callback", func(writter http.ResponseWriter, request *http.Request) {
		if request.URL.Query().Get("state") != state {
			http.Error(writter, "Invalid state", http.StatusBadRequest)
			return
		}

		token, err := config.Exchange(ctx, request.URL.Query().Get("code"))
		if err != nil {
			http.Error(writter, "Fail to try to exchange token", http.StatusInternalServerError)
			return
		}

		resp := struct {
			AccessToken *oauth2.Token
		}{
			AccessToken: token,
		}

		data, err := json.Marshal(resp)

		if err != nil {
			http.Error(writter, err.Error(), http.StatusInternalServerError)
			return
		}

		writter.Write(data)

	})

	log.Fatal(http.ListenAndServe(":8081", nil))

}
