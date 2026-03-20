import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ServiceStatus = {
    #active;
    #inactive;
    #suspended;
  };

  type Package = {
    id : Nat;
    name : Text;
    speed : Text;
    monthlyPrice : Float;
    description : Text;
  };

  type Customer = {
    id : Nat;
    name : Text;
    phone : Text;
    address : Text;
    email : Text;
    packageId : Nat;
    status : ServiceStatus;
    connectionDate : Time.Time;
    monthlyFee : Float;
    dueAmount : Float;
    area : Text;
  };

  type Payment = {
    id : Nat;
    customerId : Nat;
    amount : Float;
    date : Time.Time;
    month : Nat;
    year : Nat;
    paymentMethod : Text;
    note : Text;
  };

  type Node = {
    id : Nat;
    name : Text;
    location : Text;
    status : Text;
    connectedCustomers : Nat;
  };

  type AdminCredential = {
    email : Text;
    password : Text;
    name : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  type AdminAccount = {
    email : Text;
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  module Package {
    public func compare(p1 : Package, p2 : Package) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };
  };

  module Customer {
    public func compare(c1 : Customer, c2 : Customer) : Order.Order {
      Int.compare(c1.connectionDate, c2.connectionDate);
    };
  };

  module Payment {
    public func compare(p1 : Payment, p2 : Payment) : Order.Order {
      Int.compare(p1.date, p2.date);
    };
  };

  module Node {
    public func compare(n1 : Node, n2 : Node) : Order.Order {
      Nat.compare(n1.id, n2.id);
    };
  };

  let packages = Map.fromArray<Nat, Package>([
    (1, { id = 1; name = "10 Mbps"; speed = "10 Mbps"; monthlyPrice = 500.0; description = "Basic package" }),
    (2, { id = 2; name = "20 Mbps"; speed = "20 Mbps"; monthlyPrice = 800.0; description = "Standard package" }),
    (3, { id = 3; name = "50 Mbps"; speed = "50 Mbps"; monthlyPrice = 1200.0; description = "Premium package" }),
    (4, { id = 4; name = "100 Mbps"; speed = "100 Mbps"; monthlyPrice = 2000.0; description = "Business package" }),
  ]);

  let customers = Map.fromArray<Nat, Customer>([
    (1, { id = 1; name = "Ashraful Alom"; phone = "017xxxxxxxx"; address = "123 Main St"; email = "ashraful@email.com"; packageId = 1; status = #active; connectionDate = 1659266934000000000; monthlyFee = 500.0; dueAmount = 0.0; area = "Zone 1" }),
    (2, { id = 2; name = "Md. Joynal Abedin"; phone = "017xxxxxxxx"; address = "456 Elm St"; email = "joynal@email.com"; packageId = 2; status = #active; connectionDate = 1659266934000000000; monthlyFee = 800.0; dueAmount = 200.0; area = "Zone 2" }),
    (3, { id = 3; name = "Nushrat Jahan"; phone = "017xxxxxxxx"; address = "789 Oak St"; email = "nushrat@email.com"; packageId = 3; status = #active; connectionDate = 1659266934000000000; monthlyFee = 1200.0; dueAmount = 0.0; area = "Zone 1" }),
    (4, { id = 4; name = "Md. Mahinur Rahman"; phone = "017xxxxxxxx"; address = "321 Maple Ave"; email = "mahinur@email.com"; packageId = 4; status = #inactive; connectionDate = 1659266934000000000; monthlyFee = 2000.0; dueAmount = 500.0; area = "Zone 3" }),
    (5, { id = 5; name = "Mst. Rahima Khatun"; phone = "017xxxxxxxx"; address = "567 Birch Rd"; email = "rahima@email.com"; packageId = 2; status = #active; connectionDate = 1659266934000000000; monthlyFee = 800.0; dueAmount = 0.0; area = "Zone 2" }),
    (6, { id = 6; name = "Munshira Khatun"; phone = "017xxxxxxxx"; address = "123 Main St"; email = "munshira@email.com"; packageId = 1; status = #active; connectionDate = 1659266934000000000; monthlyFee = 500.0; dueAmount = 0.0; area = "Zone 1" }),
    (7, { id = 7; name = "Md. Kabir"; phone = "017xxxxxxxx"; address = "456 Elm St"; email = "kabir@email.com"; packageId = 2; status = #active; connectionDate = 1659266934000000000; monthlyFee = 800.0; dueAmount = 0.0; area = "Zone 2" }),
    (8, { id = 8; name = "Md. Sadiqul Islam"; phone = "017xxxxxxxx"; address = "789 Oak St"; email = "sadiqul@email.com"; packageId = 3; status = #active; connectionDate = 1659266934000000000; monthlyFee = 1200.0; dueAmount = 300.0; area = "Zone 1" }),
    (9, { id = 9; name = "Naimur Rahman"; phone = "017xxxxxxxx"; address = "321 Maple Ave"; email = "naimur@email.com"; packageId = 4; status = #active; connectionDate = 1659266934000000000; monthlyFee = 2000.0; dueAmount = 0.0; area = "Zone 3" }),
    (10, { id = 10; name = "Mohammad Zahir"; phone = "017xxxxxxxx"; address = "567 Birch Rd"; email = "zahir@email.com"; packageId = 2; status = #active; connectionDate = 1659266934000000000; monthlyFee = 800.0; dueAmount = 0.0; area = "Zone 2" }),
  ]);

  let payments = Map.fromArray<Nat, Payment>([
    (1, { id = 1; customerId = 1; amount = 500.0; date = 1659266934000000000; month = 7; year = 2022; paymentMethod = "Cash"; note = "Monthly fee" }),
    (2, { id = 2; customerId = 2; amount = 800.0; date = 1659266934000000000; month = 7; year = 2022; paymentMethod = "bKash"; note = "Monthly fee" }),
    (3, { id = 3; customerId = 3; amount = 1200.0; date = 1659266934000000000; month = 7; year = 2022; paymentMethod = "Bank"; note = "Monthly fee" }),
    (4, { id = 4; customerId = 5; amount = 800.0; date = 1659266934000000000; month = 8; year = 2022; paymentMethod = "Cash"; note = "Monthly fee" }),
    (5, { id = 5; customerId = 6; amount = 500.0; date = 1659266934000000000; month = 8; year = 2022; paymentMethod = "bKash"; note = "Monthly fee" }),
    (6, { id = 6; customerId = 7; amount = 800.0; date = 1659266934000000000; month = 8; year = 2022; paymentMethod = "Bank"; note = "Monthly fee" }),
    (7, { id = 7; customerId = 8; amount = 1200.0; date = 1659266934000000000; month = 8; year = 2022; paymentMethod = "Cash"; note = "Monthly fee" }),
    (8, { id = 8; customerId = 9; amount = 2000.0; date = 1659266934000000000; month = 8; year = 2022; paymentMethod = "bKash"; note = "Monthly fee" }),
    (9, { id = 9; customerId = 10; amount = 800.0; date = 1659266934000000000; month = 8; year = 2022; paymentMethod = "Bank"; note = "Monthly fee" }),
    (10, { id = 10; customerId = 2; amount = 600.0; date = 1659266934000000000; month = 9; year = 2022; paymentMethod = "Cash"; note = "Partial payment" }),
    (11, { id = 11; customerId = 4; amount = 1500.0; date = 1659266934000000000; month = 9; year = 2022; paymentMethod = "bKash"; note = "Monthly fee" }),
    (12, { id = 12; customerId = 5; amount = 800.0; date = 1659266934000000000; month = 9; year = 2022; paymentMethod = "Bank"; note = "Monthly fee" }),
    (13, { id = 13; customerId = 7; amount = 800.0; date = 1659266934000000000; month = 9; year = 2022; paymentMethod = "Cash"; note = "Monthly fee" }),
    (14, { id = 14; customerId = 9; amount = 2000.0; date = 1659266934000000000; month = 9; year = 2022; paymentMethod = "bKash"; note = "Monthly fee" }),
    (15, { id = 15; customerId = 3; amount = 1200.0; date = 1659266934000000000; month = 10; year = 2022; paymentMethod = "Bank"; note = "Monthly fee" }),
  ]);

  let nodes = Map.fromArray<Nat, Node>([
    (1, { id = 1; name = "Zone 1"; location = "North Chimbuk Bazar"; status = "Active"; connectedCustomers = 4 }),
    (2, { id = 2; name = "Zone 2"; location = "Hagueltaown"; status = "Active"; connectedCustomers = 4 }),
    (3, { id = 3; name = "Zone 3"; location = "Sultangonj"; status = "Active"; connectedCustomers = 2 }),
  ]);

  let adminCredentials = Map.empty<Text, AdminCredential>();

  // Packages can be viewed by anyone (public information for potential customers)
  public query func getPackages() : async [Package] {
    packages.values().toArray().sort();
  };

  // Customer data contains PII and financial info - admin only
  public query ({ caller }) func getCustomers() : async [Customer] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view customer data");
    };
    customers.values().toArray().sort();
  };

  // Payment records are sensitive financial data - admin only
  public query ({ caller }) func getPayments() : async [Payment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view payment records");
    };
    payments.values().toArray().sort();
  };

  // Network infrastructure information - admin only
  public query ({ caller }) func getNodes() : async [Node] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view network nodes");
    };
    nodes.values().toArray().sort();
  };

  // Individual customer data - admin only
  public query ({ caller }) func getCustomer(id : Nat) : async Customer {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view customer data");
    };
    switch (customers.get(id)) {
      case (null) { Runtime.trap("Customer not found") };
      case (?customer) { customer };
    };
  };

  // Package details can be viewed by anyone
  public query func getPackage(id : Nat) : async Package {
    switch (packages.get(id)) {
      case (null) { Runtime.trap("Package not found") };
      case (?p) { p };
    };
  };

  // Individual payment record - admin only
  public query ({ caller }) func getPayment(id : Nat) : async Payment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view payment records");
    };
    switch (payments.get(id)) {
      case (null) { Runtime.trap("Payment not found") };
      case (?p) { p };
    };
  };

  // Individual node information - admin only
  public query ({ caller }) func getNode(id : Nat) : async Node {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view network nodes");
    };
    switch (nodes.get(id)) {
      case (null) { Runtime.trap("Node not found") };
      case (?n) { n };
    };
  };

  // Admin Credentials Management

  // Only Internet Identity super admin can create email/password admin accounts
  public shared ({ caller }) func addAdminAccount(email : Text, password : Text, name : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only super admin can create admin accounts");
    };
    if (email.trim(#char ' ').size() == 0) {
      Runtime.trap("Email cannot be empty");
    };
    if (password.trim(#char ' ').size() == 0) {
      Runtime.trap("Password cannot be empty");
    };
    if (name.trim(#char ' ').size() == 0) {
      Runtime.trap("Name cannot be empty");
    };
    if (adminCredentials.containsKey(email)) {
      Runtime.trap("Admin account with this email already exists");
    };

    let newCredential : AdminCredential = {
      email;
      password;
      name;
    };
    adminCredentials.add(email, newCredential);
  };

  // Public login endpoint - anyone can attempt to authenticate with email/password
  // Note: This only validates credentials but does NOT grant admin privileges
  // The email/password system is separate from the Internet Identity authorization
  public query func loginAdminAccount(email : Text, password : Text) : async Text {
    switch (adminCredentials.get(email)) {
      case (null) { Runtime.trap("Admin account not found") };
      case (?credential) {
        if (credential.password != password) {
          Runtime.trap("Invalid password");
        } else {
          credential.name;
        };
      };
    };
  };

  // Only Internet Identity super admin can view admin account list
  public query ({ caller }) func getAdminAccounts() : async [AdminAccount] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only super admin can view admin accounts");
    };
    adminCredentials.values().toArray().map(
      func(credential) {
        {
          email = credential.email;
          name = credential.name;
        };
      }
    );
  };

  // Only Internet Identity super admin can remove admin accounts
  public shared ({ caller }) func removeAdminAccount(email : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only super admin can remove admin accounts");
    };
    adminCredentials.remove(email);
  };
};
