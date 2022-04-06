function create(name,subject,description,time, status) {
    return (
        <img className="indiTask"
        name={name}
        subject={subject}
        description={description}
        time={time}
        status={status}
        />
    );
  }

  function get(att)
  {
    switch(att)
    {
        case "name":
            return(this.name);
        case "subject":
            return(this.subject);
        case "description":
            return(this.description);
        case "time":
            return(this.time);
        case "status":
            return(this.status);
    }
  }

  function changeStat(newstat)
  {
      this.status={newstat}
  }