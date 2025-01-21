namespace RCMS.webapi.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class Registration
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; }
        public string StreetAddress1 { get; set; }
        public string StreetAddress2 { get; set; }
        public string State { get; set; }
        public string Region { get; set; }
        public string PostalCode { get; set; }
        public string District { get; set; }
        public string Tehsil { get; set; }
        public string Fpsshop { get; set; }
        public int membercnt { get; set; }
        public double familyincome { get; set; }
        public string Scheme { get; set; }
    }

}
