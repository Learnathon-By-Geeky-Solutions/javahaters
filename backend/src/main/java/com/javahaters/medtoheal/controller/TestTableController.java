/*
package com.javahaters.medtoheal.controller;
import com.javahaters.medtoheal.model.TestTable;
import com.javahaters.medtoheal.repository.TestTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
//@RequestMapping("/test_table")
public class TestTableController {
    @Autowired
    TestTableRepository testTableRepository;

    @PostMapping("/addTestTable")
    public void addTestTable(@RequestBody TestTable testTable) {
        System.out.println("Recieved: " + testTable);
        testTableRepository.save(testTable);
    }

}
*/
package com.javahaters.medtoheal.controller;
import com.javahaters.medtoheal.model.TestTable;
import com.javahaters.medtoheal.service.TestTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/test-tables")
public class TestTableController {

    private final TestTableService testTableService;

    @Autowired
    public TestTableController(TestTableService testTableService) {
        this.testTableService = testTableService;
    }

    // Create or Update an Entry
    @PostMapping
    public ResponseEntity<TestTable> createTestTable(@RequestBody TestTable testTable) {
        TestTable savedTestTable = testTableService.saveTestTable(testTable);
        return ResponseEntity.ok(savedTestTable);
    }

    // Get All Entries
    @GetMapping
    public ResponseEntity<List<TestTable>> getAllTestTables() {
        return ResponseEntity.ok(testTableService.getAllTestTables());
    }

    // Get a Single Entry by ID
    @GetMapping("/{id}")
    public ResponseEntity<TestTable> getTestTableById(@PathVariable Long id) {
        Optional<TestTable> testTable = testTableService.getTestTableById(id);
        return testTable.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete an Entry by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestTable(@PathVariable Long id) {
        testTableService.deleteTestTable(id);
        return ResponseEntity.noContent().build();
    }
}
