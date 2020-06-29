using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MunicipalidadDM.Models
{
    public class UsuarioVsPropiedadModel
    {
        public void AddRelacion(int IdUsuario, int IdPropiedad)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC AsociacionUsuarioPropiedades " + IdUsuario + "," + IdPropiedad), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
        public void EliminaRelacion(int IdUsuario, int IdPropiedad)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC DeletePropiedadUsuario " + IdUsuario + "," + IdPropiedad), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
    }
}
