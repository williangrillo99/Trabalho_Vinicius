using System.Text.Json.Serialization;

namespace ExpApp.DTOs;

public sealed class QRCodeResponse
{
    [JsonPropertyName("encodedImage")]
    public string EncodedImage { get; set; }
    
    [JsonPropertyName("success")]
    public bool Success { get; set; }
    
    [JsonPropertyName("payload")]
    public string Payload { get; set; }
    
    [JsonPropertyName("expirationDate")]
    public string ExpirationDate { get; set; }
    
}