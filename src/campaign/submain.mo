import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Nat8 "mo:base/Nat8";

actor class Submain(ownerId:Principal , name : Text , title : Text , description : Text , category : Text , image : [Nat8] , goalamount : Nat , date : Nat) = this{



public query func show_id():async Principal{

    return ownerId;
};




public query func show_name():async Text{

    return name
};

public query func show_title():async Text{

    return title;
};

public query func show_description():async Text{

    return description;
};

public query func show_category():async Text{

    return category;
};

public query func show_image():async [Nat8]{

    return image;
};

public query func show_goal_amount():async Nat{

    return goalamount;
};

public query func show_date():async Nat{

    return date;
};


public query func get_id():async Principal{

    return Principal.fromActor(this);
};


}