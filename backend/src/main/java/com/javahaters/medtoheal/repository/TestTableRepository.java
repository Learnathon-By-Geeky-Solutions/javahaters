//package com.javahaters.medtoheal.repository;
//
//import com.javahaters.medtoheal.model.TestTable;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;
//import org.springframework.stereotype.Repository;
//
//@RepositoryRestResource
//public interface TestTableRepository extends JpaRepository<TestTable, Long> {
//}

package com.javahaters.medtoheal.repository;
import com.javahaters.medtoheal.model.TestTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestTableRepository extends JpaRepository<TestTable, Long> {
    // Custom query methods can be added here if needed
}
