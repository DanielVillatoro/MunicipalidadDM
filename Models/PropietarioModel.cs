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

        public void AddPropietario(string Nombre,string NumDoc,string TipoDoc)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC InsertPropietario " + Nombre + "," + NumDoc + "," + TipoDoc), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }

        public void ActualizaPropietario(int Id, string nombre, string valorDoc, string TipoDoc, int Tipo)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC EditDeletePropietario " + Id + "," + nombre + "," + valorDoc + "," + TipoDoc + "," + Tipo), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
    }
}
