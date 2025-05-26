using System.Text.Json;
using ExpApp.DTOs;
using ExpApp.Service.Interface;
using RestSharp;

namespace ExpApp.Service;

public sealed class PagamentoService: IPagamentoService
{
    public async Task<QRCodeResponse> ProcessarPagamentoAsync(GerarPixRequest requestpix)
    {
     
        var cobranca = new CobrancaRequest()
        {
            FormaDePagamento = "PIX",
            IdClientAsass = requestpix.idClientAssas,
            Valor = requestpix.Valor,
            DataVencimento = new DateOnly(2025, 05, 27),
        };

        var cobrancaId = await GerarCobrancaAsync(cobranca);
        
        var options = new RestClientOptions($"https://api.asaas.com/v3/payments/{cobrancaId}/pixQrCode");
        var client = new RestClient(options);
        var request = new RestRequest("");
        request.AddHeader("accept", "application/json");
        request.AddHeader("access_token", "");

        try
        {
            var response = await client.GetAsync(request);
           
            var retorno = JsonSerializer.Deserialize<QRCodeResponse>(response.Content!);
            
            return retorno!;
            
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    private async Task<string> GerarCobrancaAsync(CobrancaRequest cobranca)
    {
        
        var cobrancaJson = JsonSerializer.Serialize(cobranca);
        var options = new RestClientOptions("https://api.asaas.com/v3/payments");
        var client = new RestClient(options);
        var request = new RestRequest("");
        request.AddHeader("accept", "application/json");
        request.AddHeader("access_token", "");
        request.AddJsonBody(cobrancaJson, false);

        try
        {
            var response = await client.PostAsync(request);
            
            var retorno = JsonSerializer.Deserialize<CobrancaResponse>(response.Content!);

            return retorno!.Id;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}