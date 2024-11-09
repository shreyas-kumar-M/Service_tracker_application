package org.shreyas.servicemanagement.repo;

import org.shreyas.servicemanagement.entity.PendingTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@EnableJpaRepositories
public interface TaskRepo extends JpaRepository<PendingTask, Integer> {
    @Query("SELECT p from PendingTask p WHERE "+
            "LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.phone1) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.phone2) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<PendingTask> searchTasks(String keyword);

    List<PendingTask> findByNameContainingIgnoreCase(String name);

    @Query("SELECT COUNT(*) from PendingTask WHERE solved=false")
    Long countTask();
}
