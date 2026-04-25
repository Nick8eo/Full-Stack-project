package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    public List<Task> getAllTasks() {
        return repo.findAll();
    }

    public Task saveTask(Task task) {
        return repo.save(task);
    }

    public void deleteTask(Long id) {
        repo.deleteById(id);
    }

    public Task toggleTask(Long id) {
        Task task = repo.findById(id).orElseThrow();
        task.setCompleted(!task.isCompleted());
        return repo.save(task);
    }
}
