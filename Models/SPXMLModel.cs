using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MunicipalidadDM.Models
{
    public class SPXMLModel
    {
        public void TipoDoc()
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC InsertTipoDocID"), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
        public void ConceptosCobro()
        {
            SqlCommand query = new SqlCommand(string.Format("EXEC InsertCCXML"), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
        public void Operaciones()
        {
            SqlCommand query = new SqlCommand(string.Format("Exec InsertOperaciones"), ConexionBD.ObtenerConexion());
            query.ExecuteNonQuery();
        }
    }
}
