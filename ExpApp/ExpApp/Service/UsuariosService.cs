using System.Text.Json;
using ExpApp.DTOs;
using ExpApp.Service.Interface;
using RestSharp;

namespace ExpApp.Service;

public class UsuarioService(Usuario.UsuarioClient grpcClient) : IUsuarioService
{
    public async Task<UsuarioResponse> AdicionarUsuarioAsync(CriarUsuarioRequest request)
    {
        try
        {
            var idClientAssas = await AdicionarClienteAssasAsync(request.Nome, request.CpfCnpj);
            request.IdClientAssas = idClientAssas;
            var response = await grpcClient.AdicionarAsync(request);

            return response;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }

    public async Task<UsuarioResponse> LogarAsync(LoginRequest request)
    {
        var retorno = await grpcClient.LoginAsync(request);

        return retorno;
    }

    private async Task<string> AdicionarClienteAssasAsync(string nome, string cpfCnpj)
    {
        var cliente = new ClienteRequest()
        {
            Nome = nome,
            CpfCnpj = cpfCnpj
        };
        var json = JsonSerializer.Serialize(cliente);
        var options = new RestClientOptions("https://api.asaas.com/v3/customers");
        var client = new RestClient(options);
        var request = new RestRequest("");
        request.AddHeader("accept", "application/json");
        request.AddHeader("access_token", "");
        request.AddJsonBody(json, false);

        try
        {
            var response = await client.PostAsync(request);
            
            var retorno = JsonSerializer.Deserialize<ClientResponse>(response.Content!);

            return retorno!.Id;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}