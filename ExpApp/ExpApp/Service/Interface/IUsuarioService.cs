namespace ExpApp.Service.Interface;

public interface IUsuarioService  
{
    Task<UsuarioResponse> AdicionarUsuarioAsync(CriarUsuarioRequest request);
    Task<UsuarioResponse> LogarAsync(LoginRequest request);

}