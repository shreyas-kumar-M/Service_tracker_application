package org.shreyas.servicemanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class TaskDto {

        private String name;
        private String phone1;
        private String phone2;
        private String address;
        private String solversname;
        private int money;
        private boolean view;
        private boolean solved;
        private String description;


}
