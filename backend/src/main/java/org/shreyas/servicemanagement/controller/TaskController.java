package org.shreyas.servicemanagement.controller;

import org.shreyas.servicemanagement.dto.TaskDto;
import org.shreyas.servicemanagement.entity.PendingTask;
import org.shreyas.servicemanagement.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
//@RequestMapping("/complaint")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/task")
    public ResponseEntity<?> addTask(@RequestBody TaskDto taskDto) {
        try {
            PendingTask t = new PendingTask(
                    taskDto.getName(),
                    taskDto.getPhone1(),
                    taskDto.getPhone2(),
                    taskDto.getAddress(),
                    taskDto.getSolversname(),
                    taskDto.getMoney(),
                    taskDto.isView(),
                    taskDto.isSolved(),
                    taskDto.getDescription()
            );
            PendingTask p1 = taskService.addTask(t);
            return new ResponseEntity<>(p1, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/task")
    public ResponseEntity<List<PendingTask>> getAllTasks() {
        try {
            return new ResponseEntity<>(taskService.getAllTasks(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/task/sort/{field}")
    public ResponseEntity<List<PendingTask>> getAllTasksSorted(@PathVariable String field) {
        try {
            return new ResponseEntity<>(taskService.getAllTasksSorted(field), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<PendingTask> getTask(@PathVariable int id){

        PendingTask pendingTask = taskService.getTaskById(id);

        if(pendingTask != null)
            return new ResponseEntity<>(pendingTask, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<String> updateTask(@PathVariable int id, @RequestBody TaskDto taskDto) {
        PendingTask pendingTask;
        pendingTask = taskService.updateTask(id,taskDto);
        if(pendingTask != null)
            return new ResponseEntity<>("Updated", HttpStatus.OK);
        else
            return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        PendingTask pendingTask = taskService.getTaskById(id);
        if(pendingTask != null) {
            taskService.deleteTask(id);
            return new ResponseEntity<>("Deleted", HttpStatus.OK);
        }
        else
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);

    }

    @GetMapping("/task/search")
    public ResponseEntity<List<PendingTask>> searchProducts(@RequestParam("search") String search){
        List<PendingTask> pendingTasks = taskService.searchTasks(search);

        return new ResponseEntity<>(pendingTasks, HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countTasks() {
        try {
            return new ResponseEntity<>(taskService.countTasks(),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
