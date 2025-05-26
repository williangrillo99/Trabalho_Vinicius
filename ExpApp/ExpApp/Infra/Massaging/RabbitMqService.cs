using RabbitMQ.Client;

namespace ExpApp.Infra.Massaging;

public class RabbitMqService() : IRabbitMqService
{
    public async Task Publish<T>(string queue, T message)
    {
        var factory = new ConnectionFactory()
        {
            HostName = "localhost",
            UserName = "admin",
            Password = "123456"
        };
        using var connection = await factory.CreateConnectionAsync();
        using var channel = await connection.CreateChannelAsync();

        await channel.QueueDeclareAsync(queue: "rabbitMensagesQueue",
            durable: false,
            exclusive: false,
            autoDelete: false,
            arguments: null);
    }

    public void Subscribe<T>(string queue, Action<T> handler)
    {
        throw new NotImplementedException();
    }
}