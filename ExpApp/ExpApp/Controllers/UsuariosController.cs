using System.Diagnostics;
using ExpApp.Service.Interface;
using Grpc.Core;
using Microsoft.AspNetCore.Mvc;
using OpenTelemetry;
using OpenTelemetry.Context.Propagation;

namespace ExpApp.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class UsuariosController(IUsuarioService usuarioService) : ControllerBase
{
    [HttpPost("Cadastrar")]
    public async Task<ActionResult> AdicionarAsync(CriarUsuarioRequest request)
    {
       var respose = await usuarioService.AdicionarUsuarioAsync(request);
       return Ok(respose);  
    }
    [HttpPost("Logar")]
    public async Task<ActionResult> Logar(LoginRequest request)
    {
        var respose = await usuarioService.LogarAsync(request);
        return Ok(respose);  
    }
  
}