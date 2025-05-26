using System.Text.Json.Serialization;

namespace ExpApp.DTOs;

public class ClienteRequest
{
    [JsonPropertyName("cpfCnpj")]
    public required string CpfCnpj {get; set;}
    
    [JsonPropertyName("name")]
    public required string Nome {get; set;}
}