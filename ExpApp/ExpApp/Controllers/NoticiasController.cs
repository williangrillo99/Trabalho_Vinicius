using ExpApp.DTOs;
using ExpApp.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace ExpApp.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class NoticiasController(INoticaService noticasService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> ListarNoticias(NoticiasRequest request)
    {
        await noticasService.ListarNoticias(request);
        return NoContent();
    }
    
}