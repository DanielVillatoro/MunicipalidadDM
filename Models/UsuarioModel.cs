using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MunicipalidadDM.Models
{
    public class UsuarioModel
    {
        public DataTable GetUsuario()
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetUsuarios"), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }

        public void AddUsuario(string Usuario, string Contrasena, string Rol) {
            SqlCommand query = new SqlCommand(string.Format("EXEC InsertUsuario " + Usuario + "," + Contrasena + "," + Rol), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }

        public void ActualizaUsuario(int Id, string Usuario, string Contrasena, string Rol,int Tipo)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC EditDeleteUsuario "+Id+","+Usuario+","+Contrasena+","+Rol+","+ Tipo), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }

        public DataTable GetPropiedad(string id)
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetPropiedadesUsuario " + Convert.ToInt32(id)), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }

        public DataTable GetUsuarios(string id)
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetPropiedadUsuarios " + Convert.ToInt32(id)), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }
    }
}
