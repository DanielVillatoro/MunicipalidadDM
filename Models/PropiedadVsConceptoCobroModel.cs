using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MunicipalidadDM.Models
{
    public class PropiedadVsConceptoCobroModel
    {
        public DataTable GetConceptos(string id)
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetConceptosPropiedad " + Convert.ToInt32(id)), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }

        public void AddRelacion(int IdProp, int IdServicio)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC AsociacionServicioPropiedad " + IdServicio + "," + IdProp), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
        public void EliminaRelacion(int IdProp, int IdServicio)
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC DeletePropiedadConceptoCobro " + IdServicio + "," + IdProp), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }


        public DataTable GetAllConceptos()
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetConceptos"), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }
    }
}
