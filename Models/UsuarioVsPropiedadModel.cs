using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MunicipalidadDM.Models
{
    public class UsuarioVsPropiedadModel
    {
        public void AddRelacion(int IdUsuario, int IdPropiedad, string fecha,string idUserAdmin,string ip)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC AsociacionUsuarioPropiedades " + IdUsuario + "," + IdPropiedad+",'"+fecha+"','"+idUserAdmin+"','"+ip+"'"), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
        public void EliminaRelacion(int IdUsuario, int IdPropiedad, string fecha, string idUserAdmin, string ip)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC DeletePropiedadUsuario " + IdUsuario + "," + IdPropiedad + ",'" + fecha + "','" + idUserAdmin + "','" + ip + "'"), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
    }
}
