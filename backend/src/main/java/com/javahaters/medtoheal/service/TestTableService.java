package com.javahaters.medtoheal.service;

import com.javahaters.medtoheal.model.TestTable;
import com.javahaters.medtoheal.repository.TestTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TestTableService {

    private final TestTableRepository testTableRepository;

    @Autowired
    public TestTableService(TestTableRepository testTableRepository) {
        this.testTableRepository = testTableRepository;
    }

    // Create or Update Entry
    public TestTable saveTestTable(TestTable testTable) {
        return testTableRepository.save(testTable);
    }

    // Get All Entries
    public List<TestTable> getAllTestTables() {
        return testTableRepository.findAll();
    }

    // Get Single Entry by ID
    public Optional<TestTable> getTestTableById(Long id) {
        return testTableRepository.findById(id);
    }

    // Delete Entry by ID
    public void deleteTestTable(Long id) {
        testTableRepository.deleteById(id);
    }
}
