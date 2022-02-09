package main

import (
	"fmt"
	"log"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	deliveryChan := make(chan kafka.Event)
	producer := NewKafkaProducer()
	Publish("Kafka with idempotence", "teste", producer, nil, deliveryChan)

	// go Async, other thread
	go DeliveryReport(deliveryChan)

	// Para o programa Go não morrer antes de dar tempo de mandar a mensagem
	producer.Flush(1000)
}

func NewKafkaProducer() *kafka.Producer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers":   "gokafka_kafka_1:9092",
		"delivery.timeout.ms": "0", // infinite
		"acks":                "all",
		"enable.idempotence":  "true",
	}

	producer, err := kafka.NewProducer(configMap)

	if err != nil {
		log.Println("Failed to create producer:", err.Error())
	}

	return producer
}

func Publish(msg string, topic string, producer *kafka.Producer, key []byte, deliveryChan chan kafka.Event) error {
	message := &kafka.Message{
		Value:          []byte(msg),
		TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
		Key:            key,
	}

	err := producer.Produce(message, deliveryChan)
	if err != nil {
		return err
	}

	return nil
}

func DeliveryReport(deliveryChan chan kafka.Event) {
	for event := range deliveryChan {
		switch event := event.(type) {
		case *kafka.Message:
			if event.TopicPartition.Error != nil {
				fmt.Println("Erro ao enviar", event.TopicPartition.Error.Error())
			} else {
				fmt.Println("Mensagem enviada:", event.TopicPartition)
				// anotar no banco de dados que a mensagem foi processada.
				// ex: confirmar que uma transferência bancaria ocorreu.
			}
		}
	}
}
