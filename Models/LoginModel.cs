using System;
using System.Data;
using System.Data.SqlClient;

namespace MunicipalidadDM.Models
{
    public class LoginModel
    {
        public DataTable ValidacionLogin(string user,string pass)
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC Login " +user+","+pass), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }
    }
}
