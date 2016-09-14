# How to

**Start command**  
mvnw spring-boot:run
  
(windows)  
mvnw.cmd spring-boot:run
  
**Available on**  
http://localhost:8080/
  
  
# 1. Non-functional requirements.
The application frond-end part should be implemented in ECMAScript 6 and Bootstrap with optional choice of mainstream JavaScript libraries such us AngularJS or React. The backend service layer should be implemented by using Java or Scala based technology stack.  

The data persistence technology is not important in this context as long as in-memory based solution is used. Keywords you might want to look up at H2, HSQLDB or even Redis.  

In general the emphasis on functional programming techniques in the code are very welcomed, however, it is not mandatory for task completion.  

The UX design and visuals are not going to be evaluated within this task.
The choice of software building and management tool (Maven, Sbt or Gradle) is not important as long as you use one. The main idea is that application is easy to build and run.  

In general we would be really happy if we could clone your source code from one of the public distributed version control systems (github,  gitlab or bitbucket) then build it with one command and run it with another with no additional work involved.

# 2. Functional requirements.
Create simple client order management system to store, edit and retrieve products. The application should have following functionality:
1.	Store and display client and product data. The client has following attributes: security number, first name, last name, phone, country and address. The product has following attributes: barcode, name, base price (EUR), description and release date. The client and product data should be editable through UI with an exception for security number and barcode.

2.	Store order with relation to existing client. The order consists of order nr, converted product price (should be in currency of client country), transaction date and product data (see p1). The converted price should be calculated during the purchase transaction. The exchange rates should be dynamically retrieved from the public API of your choice.

3.	Display order data should be sorted by order transaction date, product name, client first/last name and identity code. The entries should be also manually sortable by order number through UI. Once order data is preserved it could not be changed, however, client and product could be changed independently.


# 3. Main use case scenario.

As a main user, I want to conduct a purchase transaction. I need to find a client and a suitable product from existed data storage and add them to the transaction. In case the client or product does not exist I add them to their storages first. When both client and product are found then I confirm the purchase.

During the confirmation the exchange rates are taken from the public domain and are used to calculate the converted price. In case something goes wrong the transaction is rolled back. The storage-based changes remain since they outside of the purchase scope.
