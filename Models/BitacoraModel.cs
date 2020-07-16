using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MunicipalidadDM.Models
{
    public class BitacoraModel
    {
        public DataTable GetBitacora(string id,string fecha1,string fecha2)
        {
            DataTable datos = new DataTable();
            SqlCommand query = new SqlCommand(string.Format("EXEC GetBitacoraFechas " + Convert.ToInt32(id)+",'"+ fecha1+"','"+fecha2+"'"), ConexionBD.ObtenerConexion());
            SqlDataAdapter ada = new SqlDataAdapter(query);
            ada.Fill(datos);
            return datos;
        }
    }
}
