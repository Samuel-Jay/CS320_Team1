create table Employee (
    eid int unique not null,
    firstName varchar(50) not null,
    lastName varchar(50) not null,
    email varchar(500) not null,
    password varchar(500) not null,
    isManager boolean,
    startDate Date not null,
    positionTitle varchar(50),
    companyName varchar(50) not null,
    cid int not null,
    mid int,
    primary key (eid)
);

create table PTO (
    types varchar(5000) not null,
    startDate Date not null,
    endDate Date not null,
    notes varchar(5000),
    dueDate Date not null,
    rid int unique not null,
    eid1 int not null,
    foreign key (eid1) references Employee(eid),
    eid2 int not null,
    foreign key (eid2) references Employee(eid),
    primary key (rid)
);

create table PFRV (
    growthFeedbackScore int not null,
    growthFeedbackComment varchar(5000),
    kindnessFeedbackScore int not null,
    kindnessFeedbackComment varchar(5000),
    deliveryFeedbackScore int not null,
    deliveryFeedbackComment varchar(5000),
    overallComments varchar(10000),
    eid1 int not null,
    foreign key (eid1) references Employee(eid),
    eid2 int not null,
    foreign key (eid2) references Employee(eid),
    pid int unique not null,
    primary key (pid)
);

create table TrainAssn (
    link varchar(10000) not null,
    status boolean not null,
    aid int unique not null,
    primary key (aid),
    eid1 int not null,
    foreign key (eid1) references Employee(eid),
    eid2 int not null,
    foreign key (eid2) references Employee(eid),
);

/*the dml commands for registering new employees*/
insert into Employee (eid, firstName, lastName, email, password, isManager,
startDate, positionTitle, companyName, cid, mid)
values (1, "Connor", "Alexander", "connoralxnd@freedomgateway.com",
"vestas", true, Date("2019-06-01"), "CEO", "Freedom Gateway", 0, null),
(2, "Alexander", "Thorpe", "asthorpe53@freedomgateway.com",
"vestas", true, Date("2019-06-01"), "Technical Director",
"Freedom Gateway", 0, 1),
(3, "Jonathan", "Albon", "jntalbon@freedomgateway.com",
"vestas", true, Date("2019-06-01"), "Chief of Hardware Design and Test",
"Freedom Gateway", 0, 1),
(4, "Nikita", "Mazepin", "noahdemntis@freedomgateway.com",
"vestas", true, Date("2019-12-01"), "Junior Tester",
"Freedom Gateway", 0, 3),
(5, "Samuel", "Jayachandran", "samj57@freedomgateway.com",
"vestas", true, Date("2020-07-01"), "Developer", "Freedom Gateway", 0, 2);

/*The views for specific users*/
create view EmpName as
select e.firstName, e.lastName, e.eid, lr.*, pr.*, t.*
from Employee e, PTO lr, PFRV pr, TrainAssn t
where (e.eid = lr.eid1 or e.eid = lr.eid2),
(e.eid = pr.eid1 or e.eid = pr.eid2),
(e.eid = t.eid1 or e.eid = t.eid2);

/*The user roles*/
create role positionTitle authorization EmpName;
grant select on EmpName;