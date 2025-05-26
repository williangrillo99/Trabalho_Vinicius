using System.Text.Json.Serialization;

namespace ExpApp.DTOs;

public sealed class CobrancaRequest
{
    [JsonPropertyName("customer")]
    public required string IdClientAsass { get; set; }
    
    [JsonPropertyName("billingType")]
    public required string FormaDePagamento { get; set; }

    [JsonPropertyName("value")]
    public required int Valor { get; set; }
    
    [JsonPropertyName("dueDate")]
    public required DateOnly DataVencimento { get; set; }
}
