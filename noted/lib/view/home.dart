import 'package:flutter/material.dart';
import 'package:noted/model/colors.dart';
import 'package:noted/view/searchbar/generalsearchbar.dart';
import 'package:noted/view/searchbar/customsearchbar.dart';

//incomplete

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() {
    return _HomeState();
  }
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Icon(
              Icons.menu,
              color: Colors.white,
              size: 30,
            ),
            Image.asset(
              'assets/images/logo-darkblue.png',
              width: 40,
            ),
          ],
        ),
        //general search bar
        actions: [
          IconButton(
            onPressed: () {
              showSearch(
                context: context,
                delegate: GeneralSearchBar(),
              );
            },
            icon: const Icon(Icons.search),
          )
        ],
        backgroundColor: primary,
      ),
      body: Container(
        color: primary,
        child: const Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            //course/faculty/school search bar
            CustomSearchBar(),
            //to include list of courses
          ],
        ),
      ),
    );
  }
}
