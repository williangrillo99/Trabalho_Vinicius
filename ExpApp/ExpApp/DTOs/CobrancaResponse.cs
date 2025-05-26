using System.Text.Json.Serialization;

namespace ExpApp.DTOs;

public sealed class CobrancaResponse
{
    [JsonPropertyName("id")]
    public required string  Id { get; set; }
}