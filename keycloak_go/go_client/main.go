package main

import (
	"context"
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

	log.Fatal(http.ListenAndServe(":8081", nil))

}
