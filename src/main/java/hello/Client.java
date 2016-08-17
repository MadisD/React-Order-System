package hello;

import javax.persistence.*;

@Entity(name = "clients")
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "security_nr")
    private long securityNr;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_nr")
    private int phoneNr;

    private String country;

    private String address;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getSecurityNr() {
        return securityNr;
    }

    public void setSecurityNr(long securityNr) {
        this.securityNr = securityNr;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public int getPhoneNr() {
        return phoneNr;
    }

    public void setPhoneNr(int phoneNr) {
        this.phoneNr = phoneNr;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
