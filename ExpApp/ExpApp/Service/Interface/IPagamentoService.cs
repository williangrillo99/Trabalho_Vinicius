using ExpApp.DTOs;

namespace ExpApp.Service.Interface;

public interface IPagamentoService
{
    Task<QRCodeResponse> ProcessarPagamentoAsync(GerarPixRequest requestpix);
}