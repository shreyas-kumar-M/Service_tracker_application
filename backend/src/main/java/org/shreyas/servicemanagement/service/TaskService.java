package org.shreyas.servicemanagement.service;

import org.shreyas.servicemanagement.dto.TaskDto;
import org.shreyas.servicemanagement.entity.PendingTask;
import org.shreyas.servicemanagement.repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

    public PendingTask addTask(PendingTask t) {
        return taskRepo.save(t);
    }

    public List<PendingTask> getAllTasks() {
        return taskRepo.findAll();
    }

    public List<PendingTask> getAllTasksSorted(String field){
        return taskRepo.findAll(Sort.by(Sort.Direction.DESC,field));
    }

    public PendingTask getTaskById(int id) {
        return taskRepo.findById(id).get();
    }

    public PendingTask updateTask(int id, TaskDto taskDto) {
        if(taskRepo.existsById(id)){
            PendingTask pendingTask = taskRepo.findById(id).get();
            pendingTask.setName(taskDto.getName());
            pendingTask.setPhone1(taskDto.getPhone1());
            pendingTask.setPhone2(taskDto.getPhone2());
            pendingTask.setAddress(taskDto.getAddress());
            pendingTask.setSolversname(taskDto.getSolversname());
            pendingTask.setMoney(taskDto.getMoney());
            pendingTask.setView(taskDto.isView());
            pendingTask.setSolved(taskDto.isSolved());
            pendingTask.setDescription(taskDto.getDescription());

            return taskRepo.save(pendingTask);
        }
        else
            return null;
    }

    public void deleteTask(int id) {
        taskRepo.deleteById(id);
    }

    public List<PendingTask> searchTasks(String keyword) {
        return taskRepo.searchTasks(keyword);
    }

    public Long countTasks() {
        return taskRepo.countTask();
    }
}
