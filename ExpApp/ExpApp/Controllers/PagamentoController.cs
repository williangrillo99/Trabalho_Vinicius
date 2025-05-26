using ExpApp.DTOs;
using ExpApp.Service.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace ExpApp.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class PagamentoController(IPagamentoService pagamentoService) : ControllerBase
{
    [HttpPost("GerarQRcode")]
    public async Task<ActionResult> GerarQrCodeAsync(GerarPixRequest request)
    {
      var resultado = await pagamentoService.ProcessarPagamentoAsync(request);

      return Ok(resultado);
    }

  
}