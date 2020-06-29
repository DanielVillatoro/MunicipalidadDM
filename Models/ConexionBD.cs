using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MunicipalidadDM.Models
{
    public static class ConexionBD
    {

        //HABRE CONEXIÓN A NUESTRA BASE
        public static SqlConnection ObtenerConexion()
        {
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
            builder.DataSource = "54.152.169.76";
            builder.InitialCatalog = "dbo.municipalidad";
            builder.UserID = "dvillatoro";
            builder.Password = "Daniel2020";
            builder.ApplicationName = "MunicipalidadDM";
            Console.WriteLine(builder.ConnectionString);
            SqlConnection connection = new SqlConnection(builder.ConnectionString);
                try
                {
                    connection.Open();
                }
                catch (Exception exception)
                {
                    Console.WriteLine(exception.Message);
                }
            return connection;
        }

    }
}
