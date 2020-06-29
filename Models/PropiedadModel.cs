using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MunicipalidadDM.Models
{
    public class PropiedadModel
    {
        public DataTable GetPropiedades()
        {
            DataTable dtPropiedad = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetPropiedades"), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(dtPropiedad);
            return dtPropiedad;
        }

        public DataTable GetPropietarios(string idPropiedad)
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetPropietariosPropiedad " + Convert.ToInt32(idPropiedad)), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }

        public void AddPropiedad(string NumFinca,string Valor,string Direccion)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC InsertPropiedad " + NumFinca + "," +Convert.ToDouble(Valor) + "," + Direccion), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }

        public void ActualizaPropiedad(int Id, string num, string dir, string valor, int Tipo)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC EditDeletePropiedad " + Id + "," + num + "," + Convert.ToDouble(valor) + "," + dir + "," + Tipo), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
    }
}
