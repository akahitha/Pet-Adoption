package com.example.demo.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class pet {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long id;
    private String name;
    private String breed;
    private int age;
    private String imageUrl;
    @Version
    private Long version;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBreed() {
		return breed;
	}
	public void setBreed(String breed) {
		this.breed = breed;
	}
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public pet() {
		super();
		// TODO Auto-generated constructor stub
	}
	public pet(Long id, String name, String breed, int age, String imageUrl) {
		super();
		this.id = id;
		this.name = name;
		this.breed = breed;
		this.age = age;
		this.imageUrl = imageUrl;
	}
    
}
