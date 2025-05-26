using ExpApp.DTOs;

namespace ExpApp.Service.Interface;

public interface INoticaService
{
    Task ListarNoticias(NoticiasRequest request);
}