const { Kafka } = require("kafkajs");
const { getCurrencyAndValues } = require("./services/tcmbService");

const kafka = new Kafka({
  clientId: "currency_kafka",
  brokers: ["192.168.0.12:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "currency_group" });

const main = async () => {
  const data = await getCurrencyAndValues();
  await producer.connect();
  await producer.send({
    topic: "currency_topic",
    messages: [{ value: JSON.stringify(data) }],
  });

  await consumer.connect();
  await consumer.subscribe({ topic: "currency_topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

main().catch(console.error);
