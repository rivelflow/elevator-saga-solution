{
    init: function(elevators, floors) {
        // Tracks which waiting list should receive the next floor request.
        var buttonPresses = 2;

        // Each elevator gets its own waiting list.
        var waitingList1 = [];
        var waitingList2 = [];
        var waitingList3 = [];
        var waitingList4 = [];
        var waitingList5 = [];

        // Floors that could not be handled by their assigned elevator.
        var overflowList = [];

        // Used to find the least busy elevator.
        var smallestLoadFactor = 2;
        var leastBusyElevator;

        // Assign floor requests to the waiting lists in a round-robin fashion.
        floors.forEach((floor, floorIndex) => {
            floor.on("up_button_pressed", function() {
                switch (buttonPresses) {
                    case (0):
                        buttonPresses++;
                        waitingList1.push(floor.floorNum());
                        break;

                    case (1):
                        buttonPresses++;
                        waitingList2.push(floor.floorNum());
                        break;

                    case (2):
                        buttonPresses++;
                        waitingList3.push(floor.floorNum());
                        break;

                    case (3):
                        buttonPresses++;
                        waitingList4.push(floor.floorNum());
                        break;

                    case (4):
                        buttonPresses = 0;
                        waitingList5.push(floor.floorNum());
                        break;
                }
            });

            floor.on("down_button_pressed", function() {
                switch (buttonPresses) {
                    case (0):
                        buttonPresses++;
                        waitingList1.push(floor.floorNum());
                        break;

                    case (1):
                        buttonPresses++;
                        waitingList2.push(floor.floorNum());
                        break;

                    case (2):
                        buttonPresses++;
                        waitingList3.push(floor.floorNum());
                        break;

                    case (3):
                        buttonPresses++;
                        waitingList4.push(floor.floorNum());
                        break;

                    case (4):
                        buttonPresses = 0;
                        waitingList5.push(floor.floorNum());
                        break;
                }
            });
        });

        // Set up the behaviour of each elevator.
        elevators.forEach((elevator, index) => {
            // When an elevator becomes idle, give it the next floor
            // from its assigned waiting list.
            elevator.on("idle", function() {
                switch (index) {
                    case (0):
                        if (waitingList1.length) {
                            elevator.goToFloor(waitingList1[0]);
                            waitingList1.shift();
                        }

                    case (1):
                        if (waitingList2.length) {
                            elevator.goToFloor(waitingList2[0]);
                            waitingList2.shift();
                        }

                    case (2):
                        if (waitingList3.length) {
                            elevator.goToFloor(waitingList3[0]);
                            waitingList3.shift();
                        }

                    case (3):
                        if (waitingList4.length) {
                            elevator.goToFloor(waitingList4[0]);
                            waitingList4.shift();
                        }

                    case (4):
                        if (waitingList5.length) {
                            elevator.goToFloor(waitingList5[0]);
                            waitingList5.shift();
                        }
                }
            });

            // Move to the floor selected by a passenger inside the elevator.
            elevator.on("floor_button_pressed", function(floorNum) {
                elevator.goToFloor(floorNum);
            });

            // Check for waiting passengers while passing each floor.
            elevator.on("passing_floor", function(floorNum, direction) {
                // If this floor is already in the elevator's destination queue,
                // stop there immediately.
                if (elevator.destinationQueue.includes(floorNum)) {
                    elevator.destinationQueue =
                        elevator.destinationQueue.filter(num => num !== floorNum);

                    elevator.checkDestinationQueue();
                    elevator.goToFloor(floorNum, true);

                    // Reset the overflow search after picking up passengers.
                    overflowList = [];
                    smallestLoadFactor = 2;
                }

                // Check the waiting list assigned to this elevator.
                switch (index) {
                    case (0):
                        if (
                            waitingList1.includes(floorNum) &&
                            elevator.loadFactor() < 0.8
                        ) {
                            waitingList1 =
                                waitingList1.filter(num => num !== floorNum);

                            elevator.goToFloor(floorNum, true);
                        }

                        if (
                            waitingList1.includes(floorNum) &&
                            elevator.loadFactor() > 0.8
                        ) {
                            overflowList.push(
                                waitingList1.filter(num => num === floorNum)
                            );
                        }

                        if (elevator.loadFactor() < smallestLoadFactor) {
                            smallestLoadFactor = elevator.loadFactor();
                            leastBusyElevator = elevator;
                        }

                    case (1):
                        if (
                            waitingList2.includes(floorNum) &&
                            elevator.loadFactor() < 0.8
                        ) {
                            waitingList2 =
                                waitingList2.filter(num => num !== floorNum);

                            elevator.goToFloor(floorNum, true);
                        }

                        if (
                            waitingList2.includes(floorNum) &&
                            elevator.loadFactor() > 0.8
                        ) {
                            overflowList.push(
                                waitingList2.filter(num => num === floorNum)
                            );
                        }

                        if (elevator.loadFactor() < smallestLoadFactor) {
                            smallestLoadFactor = elevator.loadFactor();
                            leastBusyElevator = elevator;
                        }

                    case (2):
                        if (
                            waitingList3.includes(floorNum) &&
                            elevator.loadFactor() < 0.8
                        ) {
                            waitingList3 =
                                waitingList3.filter(num => num !== floorNum);

                            elevator.goToFloor(floorNum, true);
                        }

                        if (
                            waitingList3.includes(floorNum) &&
                            elevator.loadFactor() > 0.8
                        ) {
                            overflowList.push(
                                waitingList3.filter(num => num === floorNum)
                            );
                        }

                        if (elevator.loadFactor() < smallestLoadFactor) {
                            smallestLoadFactor = elevator.loadFactor();
                            leastBusyElevator = elevator;
                        }

                    case (3):
                        if (
                            waitingList4.includes(floorNum) &&
                            elevator.loadFactor() < 0.8
                        ) {
                            waitingList4 =
                                waitingList4.filter(num => num !== floorNum);

                            elevator.goToFloor(floorNum, true);
                        }

                        if (
                            waitingList4.includes(floorNum) &&
                            elevator.loadFactor() > 0.8
                        ) {
                            overflowList.push(
                                waitingList4.filter(num => num === floorNum)
                            );
                        }

                        if (elevator.loadFactor() < smallestLoadFactor) {
                            smallestLoadFactor = elevator.loadFactor();
                            leastBusyElevator = elevator;
                        }

                    case (4):
                        if (
                            waitingList5.includes(floorNum) &&
                            elevator.loadFactor() < 0.8
                        ) {
                            waitingList5 =
                                waitingList5.filter(num => num !== floorNum);

                            elevator.goToFloor(floorNum, true);
                        }

                        if (
                            waitingList5.includes(floorNum) &&
                            elevator.loadFactor() > 0.8
                        ) {
                            overflowList.push(
                                waitingList5.filter(num => num === floorNum)
                            );
                        }

                        if (elevator.loadFactor() < smallestLoadFactor) {
                            smallestLoadFactor = elevator.loadFactor();
                            leastBusyElevator = elevator;
                        }
                }

                // Send overflow requests to the least busy elevator.
                overflowList.forEach((overflowingFloor, floorIndex) => {
                    leastBusyElevator.goToFloor(overflowingFloor, true);
                });
            });
        });
    },

    update: function(dt, elevators, floors) {
        // Repeatedly update the destination queue.
        elevators.forEach((elevator, index) => {
            elevator.checkDestinationQueue();
        });
    }
}
