package org.shreyas.servicemanagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "PendingTask")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PendingTask {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "taskId")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "phone1")
    private String phone1;

    @Column(name = "phone2")
    private String phone2;

    @Column(name = "address")
    private String address;

    @Column(name = "solversname")
    private String solversname;

    @Column(name = "money")
    private int money;

    @Column(name = "view")
    private boolean view;

    @Column(name = "solved")
    private boolean solved;

    @Column(name = "description")
    private String description;

    public PendingTask(String name, String phone1, String phone2, String address, String solversname, int money, boolean view, boolean solved, String description) {
        this.name = name;
        this.phone1 = phone1;
        this.phone2 = phone2;
        this.address = address;
        this.solversname = solversname;
        this.money = money;
        this.view = view;
        this.solved = solved;
        this.description = description;
    }
}
