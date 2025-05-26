namespace ExpApp.Infra.Massaging;

public interface IRabbitMqService
{
    Task Publish<T>(string queue, T message);
    void Subscribe<T>(string queue, Action<T> handler);
}