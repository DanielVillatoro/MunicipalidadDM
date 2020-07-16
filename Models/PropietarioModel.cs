using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MunicipalidadDM.Models
{
    public class PropietarioModel
    {
        public DataTable GetPropietarios()
        {
            DataTable dtPropietarios = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetPropietarios"), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(dtPropietarios);
            return dtPropietarios;
        }

        public DataTable GetPropiedades(String id)
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetPropiedadesPropietario " + Convert.ToInt32(id)), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }

        public DataTable GetDocs()
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetTipoDocumentoId"), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }

        public void AddPropietario(string Nombre,string NumDoc,string TipoDoc, string fecha, string idUserAdmin, string ip)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC InsertPropietario '" + Nombre + "'," +Convert.ToInt32(NumDoc) + "," + Convert.ToInt32(TipoDoc) + ",'" + fecha + "','" + idUserAdmin + "','" + ip + "'"), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }

        public void ActualizaPropietario(int Id, string nombre, string valorDoc, string TipoDoc, int Tipo, string fecha, string idUserAdmin, string ip)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC EditDeletePropietario " + Id + ",'" + nombre + "'," + Convert.ToInt32(valorDoc) + "," + Convert.ToInt32(TipoDoc) + "," + Tipo + ",'" + fecha + "','" + idUserAdmin + "','" + ip + "'"), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
    }
}
