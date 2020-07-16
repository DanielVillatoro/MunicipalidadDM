using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MunicipalidadDM.Models
{
    public class PropietarioVsPropiedadModel
    {
        public void AddRelacion(int IdPropietario,int IdPropiedad, string fecha, string idUserAdmin, string ip)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC AsociacionPropietarioPropiedad " + IdPropietario + "," + IdPropiedad + ",'" + fecha + "','" + idUserAdmin + "','" + ip + "'"), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
        public void EliminaRelacion(int IdPropietario, int IdPropiedad, string fecha, string idUserAdmin, string ip)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC DeletePropiedadPropietario " + IdPropietario + "," + IdPropiedad + ",'" + fecha + "','" + idUserAdmin + "','" + ip + "'"), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
    }
}
