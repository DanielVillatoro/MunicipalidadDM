using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MunicipalidadDM.Models
{
    public class CreaAPModel
    {
        public DataTable GetMonto(string Json, int plazo)
        {
            DataTable datos = new DataTable();
            string sprocname = "CotizarAP";
            string paramName = "@json";
            using (SqlCommand cmd = new SqlCommand(sprocname, ConexionBD.ObtenerConexion()))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter(paramName, Json));
                cmd.Parameters.Add(new SqlParameter("@plazo", plazo));
                SqlDataAdapter ada = new SqlDataAdapter(cmd);
                ada.Fill(datos);
            }
            return datos;
        }

        public DataTable creaAp(string Json, int plazo)
        {
            DataTable datos = new DataTable();
            string sprocname = "InsertAP";
            string paramName = "@json";
            using (SqlCommand cmd = new SqlCommand(sprocname, ConexionBD.ObtenerConexion()))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter(paramName, Json));
                cmd.Parameters.Add(new SqlParameter("@plazo", plazo));
                SqlDataAdapter ada = new SqlDataAdapter(cmd);
                ada.Fill(datos);
            }
            return datos;
        }
    }
}
