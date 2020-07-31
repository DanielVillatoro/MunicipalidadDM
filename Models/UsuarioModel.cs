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

        public void AddUsuario(string Usuario, string Contrasena, string Rol, string fecha, string idUserAdmin, string ip)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC InsertUsuario '" + Usuario + "','" + Contrasena + "','" + Rol + "','" + fecha + "','" + idUserAdmin + "','" + ip + "'"), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }

        public void ActualizaUsuario(int Id, string Usuario, string Contrasena, string Rol, int Tipo, string fecha, string idUserAdmin, string ip)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC EditDeleteUsuario " + Id + ",'" + Usuario + "','" + Contrasena + "','" + Rol + "'," + Tipo + ",'" + fecha + "','" + idUserAdmin + "','" + ip + "'"), ConexionBD.ObtenerConexion());
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

        public DataTable GetRecibos(string idUsuario, string idPropiedad)
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetRecibosPropiedadesUsuario " + Convert.ToInt32(idUsuario) + "," + Convert.ToInt32(idPropiedad)), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }

        public DataTable GetComprobante(string id)
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetComprobantesReciboPropiedadUsuario " + Convert.ToInt32(id)), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }

        public DataTable GetMontoTotal(string Json)
        {
            DataTable datos = new DataTable();
            string sprocname = "GetInteresRecibo";
            string paramName = "@json";
            using (SqlCommand cmd = new SqlCommand(sprocname, ConexionBD.ObtenerConexion()))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter(paramName, Json));
                SqlDataAdapter ada = new SqlDataAdapter(cmd);
                ada.Fill(datos);
            }
            return datos;
        }

        public DataTable GetCP(string idPropiedad)
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetComprobantesUsuario " + Convert.ToInt32(idPropiedad)), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }
        public DataTable GetRecibosCP(string id)
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetRecibosComprobanteUsuario " + Convert.ToInt32(id)), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }
        
    }
}
