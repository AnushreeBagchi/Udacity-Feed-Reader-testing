/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This tests is  to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This  test  loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it ('URL defined', function (){
            allFeeds.forEach(element => {
               expect(element.url).toBeDefined(); 
               expect(element.url).not.toBe('');
            });

        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name defined',function (){
            allFeeds.forEach(element=> {
                expect(element.name).toBeDefined();
                expect(element.name).not.toBe('');
            });
        });


    });


    /* Test suite named "The menu" */
    describe('The menu', function (){
    
        /* This test ensures that the menu element is
         * hidden by default. 
         */
        
        it('menu hidden by default', function (){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked and reclicked.
          */
         it('Menu visibility on click and double click',function (){
             $("i.icon-list").click(); // clicked once
             expect($('body').hasClass('menu-hidden')).toBe(false);
             $("i.icon-list").click();  // clicked twice
             expect($('body').hasClass('menu-hidden')).toBe(true);
         });
        });
    /* Test suite named "Initial Entries" */
        describe('Initial Entries', function (){
        /*Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done){
            loadFeed(0,done);  
        });
        it('have entry',function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });
    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection',function(){
        var initialEntry;
        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        beforeEach(function(done){
            loadFeed(0,function(){
                initialEntry=$('.feed').html();
                loadFeed(1,done);
            })
        });

        it('new feeds loaded',function(){
            var newEntry=$('.feed').html();
            expect(newEntry).not.toBe(initialEntry);
        });
    })
}());
