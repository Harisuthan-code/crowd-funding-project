import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

actor token{

  private var tokenOwns = HashMap.HashMap<Principal , Nat>(1 , Principal.equal , Principal.hash);
  var free_count : Nat = 5000;
  var ownerId = Principal.fromText("iia5g-4aa4v-vfrcl-nmsnd-z4mvw-ia3ov-6laub-cmxv7-fptam-n2hfi-5qe");
  var ownerAmount = 1000000000;


   public func init() : async Text {
    if (tokenOwns.get(ownerId) == null) {

      tokenOwns.put(ownerId, ownerAmount);
    };

    return "Owner initialized with balance";
  };


  public shared(msg) func claim() : async Text{


    Debug.print(debug_show(msg.caller));

    let claimedPersons = tokenOwns.get(msg.caller);

    if(claimedPersons == null ){

        let result = await transfer_amount(msg.caller , free_count);

        if(result == "Tranfer Sucess"){

          return "Sucess";
        }

        else{

          return "token is Over"
        }

    }

    else{

        return "You Have aldreay claimed";

    };


  };




  public func check_balance(who : Principal):async Nat{

    let balance : Nat = switch (tokenOwns.get(who)){

      case null 0;
      case (?result) result;
    };

    return balance;



  };


  public shared(msg) func transfer_amount(toowner : Principal , amount_transfer : Nat) : async Text{


  let balance : Nat = switch (tokenOwns.get(msg.caller)){

      case null 0;
      case (?result) result;
  };

  let secondpersonbalance : Nat = switch (tokenOwns.get(toowner)){

    case null 0;
    case (?result) result;



  };

  if(balance > amount_transfer){

    let fromaccountbalance : Nat = balance - amount_transfer;

    tokenOwns.put(msg.caller , fromaccountbalance);


    let toAccountbalance : Nat = secondpersonbalance + amount_transfer;
    tokenOwns.put(toowner , toAccountbalance);

    return "Tranfer Sucess";

  }

  else{

    return "insufficent Amount"
  }


  


  };



  public func refund(fromaccount : Principal , toaccount : Principal , amount : Nat){


  let firstpersonbalance : Nat = switch (tokenOwns.get(fromaccount)){

      case null 0;
      case (?result) result;
  };

  let secondpersonbalance : Nat = switch (tokenOwns.get(toaccount)){

    case null 0;
    case (?result) result;



  };



  let fristperson_b : Nat = firstpersonbalance - amount;


  tokenOwns.put(fromaccount , fristperson_b);


  let secondperson_b : Nat = secondpersonbalance + amount;


  tokenOwns.put(toaccount , secondperson_b);




  }



}