package main

import (
	"fmt"
	"log"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	deliveryChan := make(chan kafka.Event)
	producer := NewKafkaProducer()
	Publish("Hello Go with Kafka", "teste", producer, nil, deliveryChan)

	event := <-deliveryChan
	msg := event.(*kafka.Message)
	if msg.TopicPartition.Error != nil {
		fmt.Println("Erro ao enviar", msg.TopicPartition.Error.Error())
	} else {
		fmt.Println("Mensagem enviada:", msg.TopicPartition)
	}

	// Para o programa Go não morrer antes de dar tempo de mandar a mensagem
	producer.Flush(1000)
}

func NewKafkaProducer() *kafka.Producer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "gokafka_kafka_1:9092",
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
